import { Box, Button, HStack, List, ListItem } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
const falsyPaginateApi = (page: number) => {
  let count = 10 * page;

  console.log("idx" + page);

  return {
    data: Array.from({ length: 10 }).map((_, idx) => {
      let key = count++;
      return {
        name: `Data ${key}`,
        id: key,
      };
    }),
    pageNumber: page,
  };
};

const Page = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    remove,
    refetch,
  } = useInfiniteQuery(
    "datas",
    ({ pageParam = 0 }) => {
      return falsyPaginateApi(pageParam);
    },
    {
      getNextPageParam: (lastPage) => lastPage.pageNumber + 1,
    }
  );
  console.log(data);

  return (
    <Box>
      <HStack spacing={5}>
        <Button onClick={() => fetchNextPage()}>Next Page </Button>
        <Button
          onClick={() => {
            remove();
            refetch();
          }}
        >
          Reset
        </Button>
        <Button onClick={() => fetchNextPage({ pageParam: 20 })}>
          to page 5
        </Button>
      </HStack>
      <List mt="5" ml="4">
        {data?.pages
          .map((d) => d.data)
          .flat()
          .map((item, idx) => (
            <ListItem my="2" maxWidth={"350px"} key={idx}>
              <HStack justifyContent={"space-between"}>
                <span>{item.name}</span>
                <span>{item.id}</span>
              </HStack>
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default Page;
