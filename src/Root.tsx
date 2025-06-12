import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import {SplitImageTitleScene} from "./SplitImageTitleScene";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
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
            id="SplitImageTitle"
            component={SplitImageTitleScene}
            durationInFrames={150} // can be dynamic
            fps={30}
            width={1920}
            height={1080}
            defaultProps={{
                imageUrl: 'https://media.istockphoto.com/id/1973365581/vector/sample-ink-rubber-stamp.jpg?s=2048x2048&w=is&k=20&c=-nRicEMFco-wjZrqf2MTWa5dlmVM312tNFy7Mw3Rj4I=',
                title: 'My Video Title',
                audioDurationInSeconds: 5,
            }}
        />
    </>
  );
};
