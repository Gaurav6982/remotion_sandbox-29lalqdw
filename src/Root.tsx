import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import {CombinedScene} from "./CombineScenes";
import {getAudioDurationInSeconds} from "@remotion/media-utils";
import {useEffect, useState} from "react";
import {CombinedScenesLaptop} from "./portraitLaptop/CombineScenesLaptop";
import {BoxAnimation} from "./portraitLaptop/BoxAnimation";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
    const fps = 25
    const assets = {
        "intro": {
            "defaultDurationInSeconds": 12,
            "audioUrl": "https://d10plardpjo8sx.cloudfront.net/test/mp3/intro.mp3",
        },
        "techSpec": {
            "defaultDurationInSeconds": 6,
            "audioUrl": "https://d10plardpjo8sx.cloudfront.net/test/mp3/techSpec.mp3",
        },
        "hardwareSpec": {
            "defaultDurationInSeconds": 17,
            "audioUrl": "https://d10plardpjo8sx.cloudfront.net/test/mp3/hardwareSpec.mp3",
        },
        "portAndRating": {
            "defaultDurationInSeconds": 15,
            "audioUrl": "https://d10plardpjo8sx.cloudfront.net/test/mp3/portAndRating.mp3",
        },
        "whatsInTheBox": {
            "defaultDurationInSeconds": 9,
            "audioUrl": "https://d10plardpjo8sx.cloudfront.net/test/mp3/boxcontents.mp3",
        }
    }

    const [audioIntroDurationInFrames, setAudioIntroDurationInFrames] = useState<number>(fps * assets.intro.defaultDurationInSeconds);
    const [audioTechSpecDurationInFrames, setAudioTechSpecDurationInFrames] = useState<number>(fps * assets.techSpec.defaultDurationInSeconds);
    const [audioHardwareSpecDurationInFrames, setAudioHardwareSpecDurationInFrames] = useState<number>(fps * assets.hardwareSpec.defaultDurationInSeconds);
    const [audioPortDurationInFrames, setAudioPortDurationInFrames] = useState<number>(fps * assets.portAndRating.defaultDurationInSeconds);
    const [audioBoxContentsDurationInFrames, setAudioBoxContentsDurationInFrames] = useState<number>(fps * assets.whatsInTheBox.defaultDurationInSeconds + 200);


    useEffect(() => {
        getAudioDurationInSeconds(assets.intro.audioUrl).then((seconds) => {
            setAudioIntroDurationInFrames(Math.ceil(Math.max(seconds, assets.intro.defaultDurationInSeconds) * fps));
        });
        getAudioDurationInSeconds(assets.techSpec.audioUrl).then((seconds) => {
            setAudioTechSpecDurationInFrames(Math.ceil(Math.max(seconds, assets.techSpec.defaultDurationInSeconds) * fps));
        });
        getAudioDurationInSeconds(assets.hardwareSpec.audioUrl).then((seconds) => {
            setAudioHardwareSpecDurationInFrames(Math.ceil(Math.max(seconds, assets.hardwareSpec.defaultDurationInSeconds) * fps));
        });
        getAudioDurationInSeconds(assets.portAndRating.audioUrl).then((seconds) => {
            setAudioPortDurationInFrames(Math.ceil(Math.max(seconds, assets.portAndRating.defaultDurationInSeconds) * fps));
        });
        getAudioDurationInSeconds(assets.whatsInTheBox.audioUrl).then((seconds) => {
            setAudioBoxContentsDurationInFrames(Math.ceil(Math.max(seconds, assets.whatsInTheBox.defaultDurationInSeconds) * fps));
        });
    }, []);

    if (audioIntroDurationInFrames == 0 || audioTechSpecDurationInFrames == 0 || audioHardwareSpecDurationInFrames == 0 || audioPortDurationInFrames == 0 || audioBoxContentsDurationInFrames == 0) {
        return null;
    }
  return (
    <>
        <Composition
        // You can take the "id" to render a video:
        // npx remotion render src/index.ts <id> out/video.mp4
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />
        <Composition
            id="CombinedScene"
            component={CombinedScene}
            durationInFrames={300} // scene1 + scene2 = 2 * (audioDurationInSeconds * fps)
            fps={30}
            width={1920}
            height={1080}
            defaultProps={{
                imageUrl: 'https://media.istockphoto.com/id/1973365581/vector/sample-ink-rubber-stamp.jpg?s=2048x2048&w=is&k=20&c=-nRicEMFco-wjZrqf2MTWa5dlmVM312tNFy7Mw3Rj4I=',
                title: 'Welcome to Our Service',
                heading: 'Why Choose Us',
                bulletPoints: [
                    'Fast rendering',
                    'Modular scenes',
                ],
                audioDurationInSeconds: 5,
            }}
        />

        <Composition
            id="CombinedScenePortrait"
            component={CombinedScenesLaptop}
            durationInFrames={audioIntroDurationInFrames
                + audioTechSpecDurationInFrames
                + audioHardwareSpecDurationInFrames
                + audioPortDurationInFrames
                + audioBoxContentsDurationInFrames}
            fps={fps}
            width={1080}
            height={1920}
            defaultProps={{
                introConfig: {
                    audioUrl: assets.intro.audioUrl,
                    audioDurationInFrames: audioIntroDurationInFrames,
                },
                techSpecConfig: {
                    audioUrl: assets.techSpec.audioUrl,
                    audioDurationInFrames: audioTechSpecDurationInFrames,
                },
                hardwareSpecConfig: {
                    audioUrl: assets.hardwareSpec.audioUrl,
                    audioDurationInFrames: audioHardwareSpecDurationInFrames,
                },
                portAndRatingConfig: {
                    audioUrl: assets.portAndRating.audioUrl,
                    audioDurationInFrames: audioPortDurationInFrames,
                },
                boxContentsConfig: {
                    audioUrl: assets.whatsInTheBox.audioUrl,
                    audioDurationInFrames: audioBoxContentsDurationInFrames,
                }
            }}
        />
        {/*<Composition*/}
        {/*    id="PortraitTechSpec"*/}
        {/*    component={PortraitTechSpec}*/}
        {/*    durationInFrames={audioTechSpecDurationInFrames} // scene1 + scene2 = 2 * (audioDurationInSeconds * fps)*/}
        {/*    fps={25}*/}
        {/*    width={1080}*/}
        {/*    height={1920}*/}
        {/*    defaultProps={{*/}
        {/*        audioDurationInFrames: audioTechSpecDurationInFrames,*/}
        {/*        audioUrl:assets.techSpec.audioUrl*/}
        {/*    }}*/}
        {/*/>*/}

        <Composition
            id="BoxAnimation"
            component={BoxAnimation}
            durationInFrames={audioBoxContentsDurationInFrames} // scene1 + scene2 = 2 * (audioDurationInSeconds * fps)
            fps={25}
            width={1080}
            height={1920}
            defaultProps={{
                audioUrl: assets.whatsInTheBox.audioUrl,
                audioDurationInFrames: audioBoxContentsDurationInFrames,
            }}
        />
    </>
  );
};
