import { Lottie, LottieAnimationData } from "@remotion/lottie";
import {useEffect, useState} from "react";
import {
    AbsoluteFill,
    cancelRender,
    continueRender,
    delayRender, interpolate,
    staticFile, useCurrentFrame, useVideoConfig,
} from "remotion";
import { Audio } from 'remotion';
// import fr = CSS.fr;

export const BoxAnimation: React.FC<{
    audioDurationInFrames: number;
    audioUrl: string;
}> = ({ audioDurationInFrames, audioUrl }) => {
    const [animationData, setAnimationData] =
        useState<LottieAnimationData | null>(null);

    const { fps } = useVideoConfig();

    useEffect(() => {
        const handle = delayRender("Loading Lottie animation"); // ✅ call here
        console.log("Audio duration inn frames ", audioDurationInFrames)

        fetch(staticFile("jsons/boxAnimation/data.json"))
            .then((data) => data.json())
            .then((json) => {
                const updated = { ...json };
                console.log("✅ Loaded animationData for intro:");
                console.log(updated);
                setAnimationData(updated);
                continueRender(handle);
            })
            .catch((err) => {
                cancelRender(err);
                console.log("Animation failed to load", err);
            });
    }, [fps]);

    if (audioDurationInFrames === null || !animationData) {
        console.log("FAllback")
        return (
            <AbsoluteFill style={{ backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ color: 'white', fontSize: 50 }}>Loading animation...</h1>
            </AbsoluteFill>
        );
    }
    // const opacity = fadeIn * fadeOut;
    return (

        // <Sequence from={0} durationInFrames={audioDurationInFrames + overlap}>
        <>
            <Audio src={audioUrl} />
            <div style={{opacity: 1, backgroundColor: 'black', position: 'absolute', zIndex: 4}}>
                <Lottie
                    animationData={animationData}
                    loop={false}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </>

    );
};
