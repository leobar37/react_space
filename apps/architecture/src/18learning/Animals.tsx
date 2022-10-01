import { FC, useEffect, useState } from "react";
import {
  Box,
  Input,
  Stack,
  List,
  ListItem,
  Text,
  InputProps,
} from "@chakra-ui/react";
import { Data, search } from "./data";

export const AnimalsSearch: FC<InputProps> = ({ ...props }) => {
  return (
    <Stack
      px="3"
      overflow="hidden"
      py="1"
      direction="row"
      alignContent="center"
      alignItems={"center"}
    >
      <Text fontWeight={"semibold"}>Search:</Text>
      <Input {...props} />
    </Stack>
  );
};

export const AnimalsList: FC<{ data: Data[]; isStale: boolean }> = ({
  data,
  isStale,
}) => {
  return (
    <>
      {isStale ? "stale" : "fresh"}

      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 9,
        }}
      >
        {data.map((item, key) => (
          <ListItem key={key} bg="orange.300" width="120px" height="120px">
            {item.name}
          </ListItem>
        ))}
      </List>
    </>
  );
};
export const AnimalsContainer: FC<{ title: string; isStale: boolean }> = ({
  title,
  isStale,
}) => {
  // useTransition: https://www.youtube.com/watch?v=N5R6NL3UE7I&ab_channel=WebDevSimplified
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    search(title).then(setData);
  }, [title]);

  return (
    <Box
      overflowY={"scroll"}
      sx={{
        display: "flex",
        justifyContent: "center",
        opacity: isStale ? 0.5 : 1,
      }}
    >
      <AnimalsList data={data} />
    </Box>
  );
};
