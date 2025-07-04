import { Lottie, LottieAnimationData } from "@remotion/lottie";
import {useEffect, useState} from "react";
import {
    cancelRender,
    continueRender,
    delayRender, interpolate, Sequence,
    staticFile, useCurrentFrame, useVideoConfig,
} from "remotion";
import { Audio } from 'remotion';
// import { getAudioDurationInSeconds } from '@remotion/media-utils';

export const PortraitHardwareSpec: React.FC<{
    imagePath: string,
    imageFileName: string,
    audioDurationInFrames: number;
    audioUrl: string;
    overlap: number;
}> = ({ imagePath, imageFileName, audioDurationInFrames, audioUrl, overlap }) => {
    // const handle = useMemo(() => delayRender("Loading Lottie animation"), []);
    const frame = useCurrentFrame();
    const fadeIn = interpolate(frame, [0, 10], [0, 1], {extrapolateLeft: 'clamp'});
    const fadeOut = interpolate(frame, [audioDurationInFrames - 10, audioDurationInFrames], [1, 0], {extrapolateRight: 'clamp'});
    const [animationData, setAnimationData] =
        useState<LottieAnimationData | null>(null);

    const { fps } = useVideoConfig();


    useEffect(() => {
        const handle = delayRender("Loading Lottie animation"); // ✅ call here
        console.log("Audio duration inn frames ", audioDurationInFrames)

        fetch(staticFile("jsons/hardwareSpec/data.json"))
            .then((data) => data.json())
            .then((json) => {
                const updated = { ...json };

                if (updated.assets) {

                    updated.assets = updated.assets.map((asset:any) => {
                        console.log("before asset : ", asset)
                        if (asset.p === "img_4.jpg") {
                            return {
                                ...asset,
                                u: imagePath, // new public base URL
                                p: imageFileName       // new filename
                            };
                        }

                        if (asset.p === "img_1.png") {
                            return {
                                ...asset,
                                u: imagePath, // new public base URL
                                p: "Battery.png"       // new filename
                            };
                        }

                        if (asset.p === "img_2.png") {
                            return {
                                ...asset,
                                u: imagePath, // new public base URL
                                p: "CPU-default.png"       // new filename
                            };
                        }

                        if (asset.p === "img_3.png") {
                            return {
                                ...asset,
                                u: imagePath, // new public base URL
                                p: "Intel Evo CPU.png"       // new filename
                            };
                        }

                        if (asset.p === "img_0.jpg") {
                            return {
                                ...asset,
                                u: imagePath, // new public base URL
                                p: "Display Resolution.png"       // new filename
                            };
                        }

                        if (asset.id === "comp_1") {
                            asset.layers = asset.layers.map((layer: any) => {
                                if (layer.ty === 5 && layer.nm === "1 TB Hard disk") {
                                    const textLayer = { ...layer };
                                    if (textLayer.t?.d?.k?.[0]?.s?.t !== undefined) {
                                        textLayer.t.d.k[0].s.t = "100 GB SSD";
                                        console.log("After:", textLayer.t.d.k[0].s.t); // Confirm mutation
                                    }
                                    return textLayer;
                                }
                                return layer
                            })
                            console.log("matched hdd")
                        }

                        if (asset.id === "comp_4") {
                            asset.layers = asset.layers.map((layer: any) => {
                                if (layer.ty === 5 && layer.nm === "Windows 11 Home") {
                                    const textLayer = { ...layer };
                                    if (textLayer.t?.d?.k?.[0]?.s?.t !== undefined) {
                                        textLayer.t.d.k[0].s.t = "Windows 10 Pro";
                                        console.log("After:", textLayer.t.d.k[0].s.t); // Confirm mutation
                                    }
                                    return textLayer;
                                }
                                return layer
                            })
                        }
                        return asset;
                    });
                }
                console.log("✅ Loaded animationData for hardware spec:");
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
    const opacity = fadeIn * fadeOut;
    return (
        <>
            <Audio src={audioUrl} />
            <div style={{opacity: opacity, position: 'absolute', zIndex: 2}}>
            <Lottie
                animationData={animationData}
                loop={false}
                style={{ width: '100%', height: '100%' }}
            />
            </div>
        </>
    );
};
