import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const AnimatedBackground = () => {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.07]"
      style={{ zIndex: 0 }}
    >
      <DotLottieReact
        src="https://lottie.host/f8de9d96-9dec-40d2-b249-d9ce9fb35a43/NRphKiVAus.lottie"
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};
