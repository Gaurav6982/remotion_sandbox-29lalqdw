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

export const PortraitIntro: React.FC<{
    imagePath: string,
    imageFileName: string,
    audioDurationInFrames: number;
    audioUrl: string;
    overlap:number;
}> = ({ imagePath, imageFileName, audioDurationInFrames, audioUrl, overlap }) => {
    const frame = useCurrentFrame();
    const fadeIn = interpolate(frame, [0, 10], [0, 1], {extrapolateLeft: 'clamp'});
    const fadeOut = interpolate(frame, [audioDurationInFrames - 10, audioDurationInFrames], [1, 0], {extrapolateRight: 'clamp'});
    // const handle = useMemo(() => delayRender("Loading Lottie animation"), []);

    const [animationData, setAnimationData] =
    useState<LottieAnimationData | null>(null);

    const { fps } = useVideoConfig();

    useEffect(() => {
        const handle = delayRender("Loading Lottie animation"); // ✅ call here
        console.log("Audio duration inn frames ", audioDurationInFrames)

        fetch(staticFile("jsons/intro/data.json"))
            .then((data) => data.json())
            .then((json) => {
                const updated = { ...json };

                // ✅ Change image asset path
                if (updated.assets) {
                    const newOp = audioDurationInFrames

                    // Set new global duration
                    updated.op = newOp;

                    // Ensure all layers last at least until the end
                    updated.layers = updated.layers.map((layer:any) => ({
                        ...layer,
                        op: Math.max(layer.op || 0, updated.op),
                    }));

                    updated.assets = updated.assets.map((asset:any) => {
                        if (Array.isArray(asset.layers)) {
                            asset.layers = asset.layers.map((layer:any) => ({
                                ...layer,
                                op: Math.max(layer.op || 0, updated.op),
                            }));
                        }
                        return asset;
                    });


                    updated.assets = updated.assets.map((asset:any) => {
                        console.log("before asset : ", asset)
                        if (asset.p === "img_1.jpg") {
                            return {
                                ...asset,
                                u: imagePath, // new public base URL
                                p: imageFileName       // new filename       // new filename
                            };
                        }

                        if (asset.p === "img_0.png") {
                            return {
                                ...asset,
                                u: imagePath, // new public base URL
                                p: "Weight.png"       // new filename       // new filename
                            };
                        }

                        // Width
                        if (asset.id === "comp_1") {
                            asset.layers = asset.layers.map((layer: any) => {
                                if (layer.ty === 5) {
                                    const textLayer = { ...layer };
                                    if (textLayer.t?.d?.k?.[0]?.s?.t !== undefined) {
                                        textLayer.t.d.k[0].s.t = "1.98 Kgs";
                                        console.log("After:", textLayer.t.d.k[0].s.t); // Confirm mutation
                                    }
                                    return textLayer;
                                }
                                return layer
                            })
                        }

                        // Width
                        if (asset.id === "comp_3") {
                            asset.layers = asset.layers.map((layer: any) => {
                                if (layer.ty === 5) {
                                    const textLayer = { ...layer };
                                    if (textLayer.t?.d?.k?.[0]?.s?.t !== undefined) {
                                        textLayer.t.d.k[0].s.t = "34.29 cm";
                                        console.log("After:", textLayer.t.d.k[0].s.t); // Confirm mutation
                                    }
                                    return textLayer;
                                }
                                return layer
                            })
                        }

                        // HEight
                        if (asset.id === "comp_4") {
                            asset.layers = asset.layers.map((layer: any) => {
                                if (layer.ty === 5) {
                                    const textLayer = { ...layer };
                                    if (textLayer.t?.d?.k?.[0]?.s?.t !== undefined) {
                                        textLayer.t.d.k[0].s.t = "23.3 cm";
                                        console.log("After:", textLayer.t.d.k[0].s.t); // Confirm mutation
                                    }
                                    return textLayer;
                                }
                                return layer
                            })
                        }

                        if (asset.id === "comp_6") {
                            asset.layers = asset.layers.map((layer: any) => {
                                if (layer.ty === 5) {
                                    const textLayer = { ...layer };
                                    if (textLayer.t?.d?.k?.[0]?.s?.t !== undefined) {
                                        textLayer.t.d.k[0].s.t = "HP EliteBook";
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
