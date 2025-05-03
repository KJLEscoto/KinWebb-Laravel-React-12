import clsx from "clsx";

type MainLayerProps = {
  paddingBottom?: boolean,
  paddingTop?: boolean,
  children: React.ReactNode
}

function MainLayer({ paddingBottom, paddingTop, children }: MainLayerProps) {
  return (
    <main
      className={clsx(
        'min-h-screen h-auto shadow-lg w-full bg-[#040204] rounded-b-xl lg:rounded-b-4xl',
        { '!pt-[8rem]': paddingTop },
        { '!pb-[10rem]': paddingBottom }
      )}
    >
      {children}
    </main>
  );
}

export default MainLayer;