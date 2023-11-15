"use client";

import {
  IoHome,
  IoAddOutline,
  IoSettingsOutline,
  IoAdd,
} from "react-icons/io5";
import { FaChartPie } from "react-icons/fa";
import { MdOutlineCalculate } from "react-icons/md";
import {
  Center,
  Flex,
  IconButton,
  ChakraProvider,
  Icon,
  Box,
} from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { theme } from "../../trpc/theme";

const activePaths = {
  home: "/",
  statistics: "/statistics",
  add: "/add",
  calc: "/calc",
  setting: "/setting",
};

const reversePaths = Object.fromEntries(
  Object.entries(activePaths).map(([key, value]) => [value, key]),
);

const noLayoutRoutes = ["/login", "/signup"];

export function BottomBar() {
  const router = useRouter();
  const pathName = usePathname();
  const activeKey = React.useMemo(() => {
    const key = Object.keys(reversePaths).filter((item) => item === pathName);
    if (key.length === 1) {
      return reversePaths[key[0] as keyof typeof reversePaths];
    }
    return null;
  }, [pathName]);

  console.log("pathName", pathName);
  console.log("activeKey", activeKey);
  const isActive = (key: keyof typeof activePaths) => key === activeKey;
  const goToPath = (key: keyof typeof activePaths) =>
    router.push(activePaths[key]);
  if (noLayoutRoutes.includes(pathName)) return null;

  return (
    <ChakraProvider theme={theme}>
      <Flex
        w="100vw"
        h="80px"
        color="gray"
        bg="white"
        px={"36px"}
        justify={"space-between"}
        boxShadow={"0px 0px 1px 0px gray"}
      >
        <Center
          fontSize={"3xl"}
          onClick={() => goToPath("home")}
          color={isActive("home") ? "primary.500" : undefined}
        >
          <Icon as={IoHome as never} />
        </Center>
        <Center
          fontSize={"3xl"}
          onClick={() => goToPath("statistics")}
          color={isActive("statistics") ? "primary.500" : undefined}
        >
          <Icon as={FaChartPie as never} />
        </Center>
        <Center
          fontSize={"3xl"}
          onClick={() => goToPath("add")}
          color={isActive("add") ? "primary.500" : undefined}
        >
          <Icon as={IoAddOutline as never} />
        </Center>
        <Center
          fontSize={"3xl"}
          onClick={() => goToPath("calc")}
          color={isActive("calc") ? "primary.500" : undefined}
        >
          <Icon as={MdOutlineCalculate as never} />
        </Center>
        <Center
          fontSize={"3xl"}
          onClick={() => goToPath("setting")}
          color={isActive("setting") ? "primary.500" : undefined}
        >
          <Icon as={IoSettingsOutline as never} />
        </Center>
      </Flex>
    </ChakraProvider>
  );
}