import { Lottie, LottieAnimationData } from "@remotion/lottie";
import {useEffect, useState} from "react";
import {
    cancelRender,
    continueRender,
    delayRender, interpolate,
    staticFile, useCurrentFrame, useVideoConfig,
} from "remotion";
import { Audio } from 'remotion';
// import { getAudioDurationInSeconds } from '@remotion/media-utils';

export const PortraitTechSpec: React.FC<{
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

    // const [audioDurationInFrames, setAudioDurationInFrames] = useState<number | null>(null);
    const { fps } = useVideoConfig();

    // const audioSrc = 'https://d10plardpjo8sx.cloudfront.net/test/mp3/techSpec.mp3' // or a public URL
    // const audioSrc = 'https://d10plardpjo8sx.cloudfront.net/test/mp3/40_sec_audio.mp3' // or a public URL

    useEffect(() => {
        const handle = delayRender("Loading Lottie animation"); // ✅ call here
        console.log("fps :", fps)
        // getAudioDurationInSeconds(audioSrc)
        //     .then((durationInSeconds) => {
        //         console.log("Audio duration inn seconds ", durationInSeconds)
        //         console.log("Audio duration in frames : ", Math.ceil(durationInSeconds * fps))
        //         setAudioDurationInFrames(Math.ceil(durationInSeconds * fps));
        //         continueRender(handle);
        //     })
        //     .catch((err) => {
        //         console.error('Failed to get audio duration', err);
        //     });


        console.log("Audio duration inn frames ", audioDurationInFrames)

        fetch(staticFile("jsons/techspec/Scene_02_3.json"))
            .then((data) => data.json())
            .then((json) => {
                const updated = { ...json };

                // ✅ Change image asset path
                if (updated.assets) {
                    // const newOp = audioDurationInFrames
                    //
                    // // Set new global duration
                    // updated.op = newOp;
                    //
                    // // Ensure all layers last at least until the end
                    // updated.layers = updated.layers.map((layer:any) => ({
                    //     ...layer,
                    //     op: Math.max(layer.op || 0, updated.op),
                    // }));
                    //
                    // updated.assets = updated.assets.map((asset:any) => {
                    //     if (Array.isArray(asset.layers)) {
                    //         asset.layers = asset.layers.map((layer:any) => ({
                    //             ...layer,
                    //             op: Math.max(layer.op || 0, updated.op),
                    //         }));
                    //     }
                    //     return asset;
                    // });


                    updated.assets = updated.assets.map((asset:any) => {
                        if (asset.id === "comp_0" && Array.isArray(asset.layers)) {
                            const iconLayer = {
                                ddd: 0,
                                ind: 3, // choose an index not already used
                                ty: 2, // image layer
                                nm: "Inserted Icon",
                                refId: "custom_icon",
                                ks: {
                                    o: { a: 0, k: 100, ix: 11 },
                                    r: { a: 0, k: 0, ix: 10 },
                                    p: { a: 0, k: [100, 200, 0], ix: 2 },  // Position (X, Y, Z)
                                    a: { a: 0, k: [0, 0, 0], ix: 1 },      // Anchor
                                    s: { a: 0, k: [100, 100, 100], ix: 6 } // Scale
                                },
                                ao: 0,
                                ip: 0,
                                op: 150,
                                st: 0,
                                bm: 0
                            };
                            asset.layers.push(iconLayer);
                        }

                        console.log("before asset : ", asset)
                        if (asset.p === "img_0.jpg") {
                            return {
                                ...asset,
                                u: imagePath, // new public base URL
                                p: imageFileName       // new filename
                            };
                        }

                        // if (asset.id === "custom_icon") {
                        //     return {
                        //         ...asset,
                        //         u: "https://d10plardpjo8sx.cloudfront.net/test/", // new public base URL
                        //         p: "Battery.png"           // new filename
                        //     };
                        // }

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
                console.log("✅ Loaded animationData for tech spec:");
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
    // const opacity = fadeIn * fadeOut;
    return (

        // <Sequence from={5} durationInFrames={audioDurationInFrames + overlap}>
        <>
            <Audio src={audioUrl} />
            <div style={{opacity: 1, position: 'absolute', zIndex: 3}}>
            <Lottie
                animationData={animationData}
                loop={false}
                style={{ width: '100%', height: '100%' }}
            />
            </div>
        {/*</Sequence>*/}
</>
    );
};
