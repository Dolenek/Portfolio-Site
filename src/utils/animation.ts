export const MOTION_EASE = [0.16, 1, 0.3, 1] as const;

type FadeInOptions = {
  distance?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
};

export const createStaggerFade = ({
  distance = 20,
  duration = 0.6,
  delay = 0,
  stagger = 0.08
}: FadeInOptions = {}) => ({
  hidden: { opacity: 0, y: distance },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration,
      delay: delay + index * stagger,
      ease: MOTION_EASE
    }
  })
});

export const createSimpleFade = ({
  duration = 0.6,
  delay = 0
}: Pick<FadeInOptions, "duration" | "delay"> = {}) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration,
      delay,
      ease: MOTION_EASE
    }
  }
});
