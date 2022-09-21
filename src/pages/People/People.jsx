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
  Select,
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
import { FetchRolesApi } from "../../redux/actions/roles/roles.action";

import "./style.css";

const People = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [people, setPeople] = useState([]);
  const [roles, setRoles] = useState([]);
  const [err, setErr] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
  });

  const peopleState = useSelector((state) => state.people);
  const rolesState = useSelector((state) => state.roles);

  useEffect(() => {
    dispatch(FetchPeopleApi());
    dispatch(FetchRolesApi());
  }, []);

  useEffect(() => {
    peopleState?.people.length != 0 && setPeople(peopleState?.people);
  }, [peopleState]);

  useEffect(() => {
    rolesState?.roles && setRoles(rolesState?.roles);
  }, [rolesState]);

  const handleRolesOnchange = (value) => {
    setFormData({ ...formData, role: value });
  };

  const handleAddPerson = () => {
    console.log("COMING HERE");
    console.log(formData);
    if (!formData.email || !formData.fullName || !formData.role) {
      return setErr(true);
    }
    dispatch(CreateUserApi(formData));
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
                  <Select
                    placeholder="Select option"
                    onChange={(e) => handleRolesOnchange(e.target.value)}
                  >
                    {roles &&
                      roles.map((ele) => {
                        return <option value={ele?._id}>{ele?.value}</option>;
                      })}
                  </Select>
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
            <p style={{ color: "#333", fontWeight: "bold", fontSize: 35 }}>
              People
            </p>
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
          <hr style={{ border: "1px solid #c4c4c4" }} />
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
                      {dayjs(ele?.createdAt).format("MM:DD:YYYY h:mm A")}
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
