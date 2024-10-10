import { CarouselItem } from "./carousel/carousel-types";
import { Carousel } from "./carousel/Carousel";
import { useMemo } from "react";
import { secretGrantDocuments } from "./dummy-data";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { convertIsoCountryNumberTo2Letter } from "./country-code-mapping";

export const App = () => {
  // Our Carousel component works with a generic shape of data for different use
  // cases, so before handing our grant documents to the carousel we need to
  // convert the grant documents into generic carousel items.
  const grantItemsConvertedForCarousel = useMemo<CarouselItem[]>(() => {
    return secretGrantDocuments.map<CarouselItem>(
      ({ documentContent, grant }) => ({
        title: grant.stakeholderName,
        content: documentContent,
        categories: grant.taxRules.map((taxRule) => {
          const countryCode2Letter =
            convertIsoCountryNumberTo2Letter(taxRule.countryCode) ?? "ZZ";
          return {
            name: taxRule.taxRuleName,
            icon: getUnicodeFlagIcon(countryCode2Letter),
          };
        }),
      })
    );
  }, []);

  return (
    <div>
      <Carousel items={grantItemsConvertedForCarousel} itemLabel="Grants" />
    </div>
  );
};
