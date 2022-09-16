import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllProjectsByCurrentUser,
  AddProjectAction,
  signout,
} from "../redux/actions";
import { ArrowBackIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import {
  Tabs,
  Text,
  Box,
  Button,
  Modal,
  useToast,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  InputRightElement,
  InputGroup,
  FormControl,
  FormLabel,
  Input,
  Divider,
  Stack,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import SideBar from "../Layout/SideBar/SideBar";

const ProjectHome = () => {
  const toast = useToast();
  const [isNext, setIsNext] = useState(false);
  const [projectLoading, setProjectLoading] = useState(false);
  const [allProjects, setAllProjects] = useState([true]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const projectStateData = useSelector((state) => state.project);
  const projectState = useSelector((state) => state.project.projectApiCall);
  const dispatch = useDispatch();
  const initialRef = useRef();
  const finalRef = useRef();
  const navigate = useNavigate();
  const [project, setProject] = useState({
    title: "",
    kickOff: "",
    magic_link: "",
    error: "",
  });
  const onChangeHandler = (e) => {
    setProject((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    projectStateData?.apiLoader?.projectsFetchLoading &&
      setProjectLoading(true);
  }, [projectStateData?.apiLoader?.projectsFetchLoading]);

  const onHandleSubmit = async (event) => {
    event.preventDefault();
    let projectData = {
      title: project.title,
      kickOff: project.kickOff,
    };
    dispatch(AddProjectAction(projectData));
    dispatch(GetAllProjectsByCurrentUser());
    onClose();
  };
  const handleSignOut = () => {
    dispatch(signout());
    navigate("/", { replace: true });
  };
  useEffect(() => {
    dispatch(GetAllProjectsByCurrentUser());
  }, []);
  useEffect(() => {
    if (projectState?.apiCalled) {
      toast({
        title: projectState?.title,
        status: projectState?.status,
        isClosable: true,
      });
    }
  }, [projectStateData?.projectApiCall]);

  // if (projectStateData?.gettingAllProjects) {
  // 	return <Loader />;
  // }
  return (
    <SideBar>
      {projectLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <>
          <Tabs align="end" display="flex" justifyContent="space-between">
            <Text mt={4} ml={52} fontSize="2xl" as="b">
              My Projects
            </Text>
            <Stack direction="row" align="center">
              <Button
                onClick={onOpen}
                colorScheme="linkedin"
                variant="outline"
                mt={4}
                mr={8}
                mb={4}
              >
                Create project
              </Button>
              <Button
                colorScheme="linkedin"
                mr={16}
                variant="outline"
                onClick={handleSignOut}
              >
                Logout
              </Button>
            </Stack>
          </Tabs>
          <Divider />
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            {!isNext ? (
              <ModalContent>
                <ModalHeader fontSize={28}>
                  Start Your First Project
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={5}>
                  <FormControl>
                    <FormLabel>Customer Name</FormLabel>
                    <Input
                      ref={initialRef}
                      placeholder="Title"
                      id="title"
                      onChange={onChangeHandler}
                      name="title"
                      value={project.title}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Project kickoff</FormLabel>
                    <Input
                      type="date"
                      id="kickOff"
                      onChange={onChangeHandler}
                      name="kickOff"
                      value={project.kickOff}
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="teal" onClick={() => setIsNext(!isNext)}>
                    Next
                  </Button>
                </ModalFooter>
              </ModalContent>
            ) : (
              <ModalContent>
                <ArrowBackIcon
                  onClick={() => setIsNext(!isNext)}
                  w={6}
                  h={6}
                  mt={4}
                  ml={4}
                />
                <ModalHeader fontSize={28}>Choose a template</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <Button>Customer onboarding for B2B software</Button>
                </ModalBody>
                <ModalBody pb={6} mt={16}>
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    onClick={onHandleSubmit}
                  >
                    Create project using template
                  </Button>
                </ModalBody>
                {/* <ModalFooter></ModalFooter> */}
              </ModalContent>
            )}
          </Modal>
          {projectStateData?.totalProjects === 0 ? (
            <Text ml={16}>No projects found</Text>
          ) : (
            <>
              {projectStateData?.allProjects?.allProjectsByCurrentUser?.map(
                (item) => {
                  return (
                    <Link to={`/dashboard/${item?.magic_link}/${item?._id}`}>
                      <Box
                        borderRadius="lg"
                        display="flex"
                        mt={4}
                        ml={52}
                        p={4}
                        w="70%"
                        color="vlue"
                        justifyContent="space-between"
                        _hover={{
                          background: "#b2bcd6",
                          color: "white",
                        }}
                        key={item._id}
                      >
                        <Text>{item.title}</Text> <Text>{item.dueDate}</Text>
                      </Box>
                    </Link>
                  );
                }
              )}
            </>
          )}
        </>
      )}
    </SideBar>
  );
};

export default ProjectHome;
