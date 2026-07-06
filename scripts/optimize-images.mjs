import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT_DIR = process.cwd();
const SOURCE_DIR = path.join(ROOT_DIR, "assets/source");
const PUBLIC_OUTPUT_DIR = path.join(ROOT_DIR, "public/assets/generated");
const MANIFEST_PATH = path.join(ROOT_DIR, "src/data/generated/media.ts");

const PROJECT_WIDTHS = [480, 800, 1200, 1600];
const PROJECT_SIZES = "(max-width: 900px) calc(100vw - 2rem), 720px";

const projectImages = [
  ["deadlockPatchNotes", "deadlock-patch-notes", "deadlock-patch-notes.png"],
  ["levneDeskovky", "levne-deskovky", "levne-deskovky.png"],
  ["kucharVAkci", "kuchar-v-akci", "kuchar-v-akci.png"],
  ["portfolio", "portfolio", "portfolio.png"],
  ["discordAutomation", "discord-automation", "discord-automation.png"],
  ["mobileGameUnity", "mobile-game-unity", "mobile-game-unity.png"]
];

const ensureParentDirectory = async (targetPath) => {
  await fs.mkdir(path.dirname(targetPath), { recursive: true });
};

const webPath = (filePath) => {
  const relativePath = path.relative(path.join(ROOT_DIR, "public"), filePath);
  return `/${relativePath.split(path.sep).join("/")}`;
};

const readImageDimensions = async (sourcePath) => {
  const metadata = await sharp(sourcePath).metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error(`Unable to read dimensions for ${sourcePath}`);
  }
  return { width: metadata.width, height: metadata.height };
};

const createImagePipeline = (sourcePath, width) => {
  return sharp(sourcePath).rotate().resize({
    width,
    fit: "inside",
    withoutEnlargement: true
  });
};

const writeImageVariant = async ({ sourcePath, targetPath, width, format }) => {
  await ensureParentDirectory(targetPath);
  let image = createImagePipeline(sourcePath, width);

  if (format === "avif") {
    image = image.avif({ quality: 58, effort: 4, chromaSubsampling: "4:2:0" });
  } else if (format === "webp") {
    image = image.webp({ quality: 78, effort: 5 });
  } else if (format === "jpeg") {
    image = image.flatten({ background: "#ffffff" }).jpeg({
      quality: 78,
      mozjpeg: true,
      progressive: true
    });
  } else if (format === "png") {
    image = image.png({ compressionLevel: 9, palette: true });
  }

  const info = await image.toFile(targetPath);
  return { path: webPath(targetPath), width: info.width, height: info.height };
};

const resolveVariantWidths = async (sourcePath, requestedWidths) => {
  const dimensions = await readImageDimensions(sourcePath);
  const widths = requestedWidths.filter((width) => width <= dimensions.width);
  return widths.length > 0 ? widths : [dimensions.width];
};

const toSrcSet = (variants) => {
  return variants.map((variant) => `${variant.path} ${variant.width}w`).join(", ");
};

const createResponsiveImage = async ({ key, slug, sourcePath }) => {
  const widths = await resolveVariantWidths(sourcePath, PROJECT_WIDTHS);
  const formats = ["avif", "webp", "jpeg"];
  const variants = {};

  for (const format of formats) {
    variants[format] = [];
    for (const width of widths) {
      const targetPath = path.join(PUBLIC_OUTPUT_DIR, "projects", `${slug}-${width}.${format}`);
      variants[format].push(await writeImageVariant({ sourcePath, targetPath, width, format }));
    }
  }

  const fallback = variants.jpeg.at(-1);
  return {
    key,
    image: {
      src: fallback.path,
      width: fallback.width,
      height: fallback.height,
      sizes: PROJECT_SIZES,
      sources: [
        { type: "image/avif", srcSet: toSrcSet(variants.avif) },
        { type: "image/webp", srcSet: toSrcSet(variants.webp) }
      ]
    }
  };
};

const writeFixedImage = async ({ sourcePath, targetPath, width, format }) => {
  const variant = await writeImageVariant({ sourcePath, targetPath, width, format });
  return variant.path;
};

const formatJsonForTypeScript = (value) => {
  return JSON.stringify(value, null, 2).replace(/"([^"]+)":/g, "$1:");
};

const writeManifest = async ({ projectPreviewImages, siteImages, skillImages }) => {
  const content = `export type ResponsiveImageSource = {
  type: string;
  srcSet: string;
};

export type ResponsiveImage = {
  src: string;
  width: number;
  height: number;
  sizes: string;
  sources: readonly ResponsiveImageSource[];
};

export const projectPreviewImages = ${formatJsonForTypeScript(projectPreviewImages)} as const;

export const siteImages = ${formatJsonForTypeScript(siteImages)} as const;

export const skillImages = ${formatJsonForTypeScript(skillImages)} as const;
`;

  await ensureParentDirectory(MANIFEST_PATH);
  await fs.writeFile(MANIFEST_PATH, content);
};

const buildProjectImages = async () => {
  const entries = await Promise.all(
    projectImages.map(([key, slug, filename]) =>
      createResponsiveImage({
        key,
        slug,
        sourcePath: path.join(SOURCE_DIR, "projects", filename)
      })
    )
  );

  return Object.fromEntries(entries.map((entry) => [entry.key, entry.image]));
};

const buildSiteImages = async () => {
  const brandSource = path.join(SOURCE_DIR, "brand/jd.png");
  const socialImage = await writeFixedImage({
    sourcePath: brandSource,
    targetPath: path.join(PUBLIC_OUTPUT_DIR, "brand/social-1024.jpg"),
    width: 1024,
    format: "jpeg"
  });

  return {
    favicon32: await writeFixedImage({
      sourcePath: brandSource,
      targetPath: path.join(PUBLIC_OUTPUT_DIR, "brand/favicon-32.png"),
      width: 32,
      format: "png"
    }),
    appleTouchIcon: await writeFixedImage({
      sourcePath: brandSource,
      targetPath: path.join(PUBLIC_OUTPUT_DIR, "brand/apple-touch-icon.png"),
      width: 180,
      format: "png"
    }),
    socialImage,
    profilePortrait: socialImage
  };
};

const buildSkillImages = async () => {
  return {
    aiAssistedEngineering: await writeFixedImage({
      sourcePath: path.join(SOURCE_DIR, "skills/ai-assisted-engineering.png"),
      targetPath: path.join(PUBLIC_OUTPUT_DIR, "skills/ai-assisted-engineering-96.webp"),
      width: 96,
      format: "webp"
    })
  };
};

const main = async () => {
  await fs.rm(PUBLIC_OUTPUT_DIR, { recursive: true, force: true });
  await fs.mkdir(PUBLIC_OUTPUT_DIR, { recursive: true });

  const [projectPreviewImages, siteImages, skillImages] = await Promise.all([
    buildProjectImages(),
    buildSiteImages(),
    buildSkillImages()
  ]);

  await writeManifest({ projectPreviewImages, siteImages, skillImages });
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
