import BottleIcon from "@/icons/BottleIcon";
import Image from "next/image";

type Props = {
  // the image of the drink from the api, null = the drink has none and the placeholder is shown
  image: { url: string; altText: string | null; width: number; height: number } | null;
  // the name of the drink, the alt text when the image has none
  name: string;
  // true: above the fold, loaded right away (the first cards of a page)
  priority?: boolean;
  // how wide the card is on each screen, so the browser loads an image that is sharp but not bigger than needed
  sizes?: string;
};

// the image of a drink in a card (square, the whole bottle is visible), a bottle icon while the drink has none
const DrinkImage = ({ image, name, priority, sizes = "(min-width: 1280px) 20vw, (min-width: 640px) 30vw, 50vw" }: Props) => (
  <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden bg-stone-50">
    {image ? (
      <Image
        src={image.url}
        alt={image.altText || name}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        className="h-full w-full object-contain p-3"
      />
    ) : (
      <BottleIcon className="h-1/3 w-1/3 text-stone-300" />
    )}
  </div>
);

export default DrinkImage;
