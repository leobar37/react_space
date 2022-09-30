import { Box, Center } from "@chakra-ui/react";
import { FC, useState } from "react";
import { AnimalsList, AnimalsSearch } from "./Animals";
import { useEffect, useTransition } from "react";
import { search } from "./data";

export const UseTranstionExample: FC = () => {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("happening now");
    search(query).then((result) => {
      startTransition(() => {
        console.log("happening now");
        setData(result);
      });
    });
  }, [query, startTransition]);
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
          {isPending ? "isPending" : <AnimalsList data={data} />}
        </Box>
      </Box>
    </Center>
  );
};
