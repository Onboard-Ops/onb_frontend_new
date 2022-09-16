import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../Layout/SideBar/SideBar";
import { CreateUserApi, FetchPeopleApi } from "../../redux/actions";

import "./style.css";

const People = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [people, setPeople] = useState([]);
  const [err, setErr] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
  });

  const peopleState = useSelector((state) => state.people);

  useEffect(() => {
    dispatch(FetchPeopleApi());
  }, []);

  useEffect(() => {
    peopleState?.people.length != 0 && setPeople(peopleState?.people);
  }, [peopleState]);

  const handleAddPerson = () => {
    console.log("COMING HERE");
    console.log(formData);
    if (!formData.email || !formData.fullName || !formData.role) {
      return setErr(true);
    }
    dispatch(CreateUserApi(formData)); // Needs to Change (Role Populate issue)
  };

  return (
    <SideBar>
      {peopleState?.peopleLoading ? (
        <Spinner
          style={{ display: "flex", justifyContent: "center", margin: "auto" }}
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <div>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Person</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl style={{ marginBottom: 20 }}>
                  <Input
                    placeholder="Full name*"
                    value={formData?.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl style={{ marginBottom: 20 }}>
                  <Input
                    placeholder="Email*"
                    value={formData?.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl style={{ marginBottom: 20 }}>
                  <Input
                    placeholder="Role*"
                    value={formData?.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                  />
                </FormControl>
                {err && (
                  <p style={{ color: "tomato" }}>All fields are required!</p>
                )}
                <Button
                  style={{ marginBottom: 20 }}
                  onClick={() => handleAddPerson()}
                >
                  Add person
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>
          <div className="people_flex">
            <Heading as="h4" size="xl" style={{ textDecoration: "underline" }}>
              People
            </Heading>
            <Button
              onClick={onOpen}
              colorScheme="linkedin"
              variant="outline"
              mt={4}
              mr={8}
              mb={4}
            >
              Add people
            </Button>
          </div>
          {people &&
            people.map((ele) => {
              return (
                <Link to={`/dashboard`}>
                  <Box
                    borderRadius="lg"
                    display="flex"
                    mt={4}
                    ml={140}
                    p={4}
                    w="80%"
                    color="vlue"
                    justifyContent="space-between"
                    _hover={{
                      background: "#b2bcd6",
                      color: "white",
                    }}
                    key={12}
                  >
                    <Text>{ele?.fullName}</Text>
                    <Text>{ele?.role}</Text>
                    <Text>{ele?.email}</Text>
                    <Text>
                      {dayjs(ele?.createdAt).format("DD:MM:YYYY hh:mm A")}
                    </Text>
                  </Box>
                </Link>
              );
            })}
        </div>
      )}
    </SideBar>
  );
};

export default People;
