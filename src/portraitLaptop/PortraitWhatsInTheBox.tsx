import { Lottie, LottieAnimationData } from "@remotion/lottie";
import {useEffect, useState} from "react";
import {
    cancelRender,
    continueRender,
    delayRender, Sequence,
    staticFile, useVideoConfig,
} from "remotion";
import { Audio } from 'remotion';

export const PortraitWhatsInTheBox: React.FC<{
    imagePath: string,
    imageFileName: string,
    audioDurationInFrames: number;
    audioUrl: string;
    lottieFileName: string;
}> = ({ imagePath, imageFileName, audioDurationInFrames, audioUrl, lottieFileName }) => {
    // const handle = useMemo(() => delayRender("Loading Lottie animation"), []);

    const [animationData, setAnimationData] =
        useState<LottieAnimationData | null>(null);

    const { fps } = useVideoConfig();

    useEffect(() => {
        const handle = delayRender("Loading Lottie animation"); // ✅ call here
        fetch(staticFile(`jsons/whatsIntheBox/${lottieFileName}.json`))
            .then((data) => data.json())
            .then((json) => {
                const updated = { ...json };
                console.log("Before:", updated.assets);
                if (updated.assets) {
                    updated.assets = updated.assets.map((asset:any) => {
                        if (asset.p === "img_1.png") {
                            return {
                                ...asset,
                                u: imagePath, // new public base URL
                                p: imageFileName    // new filename
                            };
                        }
                        if (asset.p === "img_2.png") {
                            return {
                                ...asset,
                                u: imagePath, // new public base URL
                                p: imageFileName       // new filename
                            };
                        }
                        if (asset.p === "img_3.png") {
                            return {
                                ...asset,
                                u: imagePath, // new public base URL
                                p: imageFileName       // new filename
                            };
                        }
                        if (asset.p === "img_4.png") {
                            return {
                                ...asset,
                                u: imagePath, // new public base URL
                                p: imageFileName       // new filename
                            };
                        }if (asset.p === "img_0.png") {
                            return {
                                ...asset,
                                u: imagePath, // new public base URL
                                p: imageFileName       // new filename
                            };
                        }

                        return asset;
                    });
                }
                console.log("✅ Loaded animationData for whats in the box:");
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
        console.log("Audio DUration :", audioDurationInFrames)
        console.log("AnimationData :", animationData)
        return null; // wait until duration is loaded
    }

    return (
        <Sequence from={0} durationInFrames={audioDurationInFrames}>
            <Audio src={audioUrl} />
            <Lottie
                animationData={animationData}
                loop={false}
                style={{ width: '100%', height: '100%' }}
            />
        </Sequence>
    );
};
