import Paragraph from "@/components/core/typography/Paragraph";
import { t } from "@/translations/translate";
import { formatPrice } from "@/utils/money";

type Props = {
  price: number;
  inStock: boolean;
  // large: in the detail of the drink
  size?: "base" | "large";
};

// the price of a drink and whether it is in stock (the card and the detail of the drink)
const DrinkPrice = ({ price, inStock, size = "base" }: Props) => (
  <div className={size === "large" ? "flex items-baseline justify-between gap-2" : ""}>
    <p className={`font-bold text-brand ${size === "large" ? "text-2xl" : "text-lg"}`}>{t("drinks:price", { price: formatPrice(price) })}</p>
    <Paragraph
      text={inStock ? t("drinks:inStock") : t("drinks:outOfStock")}
      size={size === "large" ? "sm" : "xs"}
      color={inStock ? "green" : "grey"}
    />
  </div>
);

export default DrinkPrice;
