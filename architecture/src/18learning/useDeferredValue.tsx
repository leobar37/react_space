import { Box, Center } from "@chakra-ui/react";
import { FC, useState, useMemo } from "react";
import { AnimalsList, AnimalsSearch } from "./Animals";
import { useEffect, useTransition, useDeferredValue } from "react";
import { search } from "./data";

export const UseDeferredValueExample: FC = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const queryDeferred = useDeferredValue(query);
  console.log(data.length);

  useEffect(() => {
    console.log("happening now");
    search(queryDeferred).then((result) => {
      console.log("happening now");
      setData(result);
    });
  }, [queryDeferred]);
console.log(queryDeferred);

  const list = useMemo(() => {
    return <AnimalsList isStale={query !== queryDeferred} data={data} />;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryDeferred, data]);

  return (
    <Center
      sx={{
        width: "100%",
        height: "100vh",
        bg: "blue.600",
      }}
    >
      <Box bg={"white"} p={8}>
        <AnimalsSearch
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Box
          sx={{
            mt: 2,
            maxHeight: "500px",
            overflowY: "scroll",
          }}
        >
          {list}
        </Box>
      </Box>
    </Center>
  );
};
