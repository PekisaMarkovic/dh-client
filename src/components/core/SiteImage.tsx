import Image from "next/image";
import { IImage } from "@/interfaces";

type Props = {
  image: IImage;
  // the name of the thing on the picture, the alt text when the image has none
  fallbackAlt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

// a picture from the database that fills its parent (the parent sets the shape: aspect-ratio and `relative`), it is cropped, not stretched
const SiteImage = ({ image, fallbackAlt, sizes, priority, className = "" }: Props) => (
  <Image src={image.url} alt={image.altText || fallbackAlt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />
);

export default SiteImage;
