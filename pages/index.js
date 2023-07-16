import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import Property from "../components/Property";

const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  linkName,
  buttonText,
  imageUrl,
}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} alt="banner" />
    <Box p="5" paddingLeft="3" width={500}>
      <Text color="gray.500" fontSize="lg" fontWeight="medium">
        {purpose}
      </Text>
      <Text fontSize="2xl" fontWeight="bold">
        {title1}
        <br />
        {title2}
      </Text>
      <Text color="gray.700" fontSize="md" paddingTop="3" paddingBottom="3">
        {desc1}
        <br />
        {desc2}
      </Text>
      <Button fontSize="lg" borderRadius="sm" colorScheme="red" color="white">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);

export default function Home({ propertiesForSale, propertiesForRent }) {
  return (
    <Box>
      <Banner
        purpose="Rent a home"
        title1="Your perfect rental is"
        title2="now on Redfin"
        desc1="Explore Apartments, Villas, Homes,"
        desc2="and more."
        buttonText="Find rentals"
        linkName="/search?purpose=for-rent"
        imageUrl="https://images.unsplash.com/photo-1615404420216-cc423164563f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format"
      />
      <Flex justifyContent="center" flexWrap="wrap">
        {propertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      <Banner
        purpose="Buy a home"
        title1="Find, Buy & Own Your"
        title2="Dream Home"
        desc1="Explore Apartments, Villas, Homes,"
        desc2="and more."
        buttonText="Browse homes"
        linkName="/search?purpose=for-sale"
        imageUrl="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1673&q=80"
      />
      <Flex justifyContent="center" flexWrap="wrap">
        {propertiesForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
    </Box>
  );
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}
