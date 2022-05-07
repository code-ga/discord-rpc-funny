import { Formik, FormikHelpers, Form } from "formik";
import { Button } from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import InputField from "./../components/InputField";
import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Image } from "@chakra-ui/react";
import ShowImage from "../components/ShowImage";
interface inputType {
  clientId: string;
  details: string;
  state: string;
  largeImageKey?: string;
  smallImageKey?: string;
  largeImageText?: string;
  smallImageText?: string;
}
const Index = () => {
  const [isTurnOn, setIsTurnOn] = useState(false);
  const initialValues: inputType = {
    clientId: "",
    details: "",
    state: "",
    largeImageKey: "",
    smallImageKey: "",
    largeImageText: "",
    smallImageText: "",
  };
  const onSubmit = (
    values: inputType,
    formikHelpers: FormikHelpers<inputType>
  ) => {
    console.log(values);
    if (isTurnOn) {
      if (values.clientId === "") {
        formikHelpers.setErrors({
          clientId: "clientId is required",
        });
        return;
      }
      global.ipcRenderer.send("stopSet", values);
      setIsTurnOn(false);
    } else {
      if (values.clientId === "") {
        formikHelpers.setFieldError("clientId", "clientId is required");
        return;
      }
      if (values.details === "") {
        formikHelpers.setFieldError("details", "details is required");
        return;
      }
      if (values.state == "") {
        formikHelpers.setFieldError("state", "state is required");
        return;
      }
      if (values.largeImageKey == "") {
        values.largeImageKey = undefined;
      }
      if (values.smallImageKey == "") {
        values.smallImageKey = values.largeImageKey;
      }

      global.ipcRenderer.send("startSet", values);
      setIsTurnOn(true);
      return;
    }
  };
  const onClickToP = (e) => {
    window.open("https://github.com/tritranduc");
  };
  return (
    <Wrapper>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values }) => (
          <Form>
            {/* {JSON.stringify(values)} */}
            <Grid templateColumns="repeat(3, 1fr)" gap={3} mb={10}>
              <GridItem w="100%" h="90">
                <InputField
                  label="client-id"
                  name="clientId"
                  placeholder="type your client id"
                  type="password"
                />
              </GridItem>
              <GridItem w="100%" h="90">
                <InputField
                  label="tựa đề của công việc"
                  name="details"
                  placeholder="viết tựa đề của công việc vào đi"
                />
              </GridItem>
              <GridItem w="100%" h="90">
                <InputField
                  label="mô tả thêm cho công việc"
                  name="state"
                  placeholder="viết mô tả thêm cho công việc vào đi"
                />
              </GridItem>

              <GridItem w="100%" h="90">
                <InputField
                  label="small Image để trống nếu không dùng"
                  name="smallImageKey"
                  placeholder="dán url hình ảnh ( cái hình nhỏ ) vào đi"
                />
                {/* <ShowImage src={values.smallImageKey} /> */}
              </GridItem>
              <GridItem w="100%" h="90">
                <InputField
                  label="smallImageText để trống nếu không dùng"
                  name="smallImageText"
                  placeholder="dán text ( cho cái hình nhỏ vào đi ) vào đi"
                />
              </GridItem>
              <GridItem w="100%" h="90">
                <InputField
                  label="largeImageText để trống nếu không dùng"
                  name="largeImageText"
                  placeholder="dán text (cho cái hình to vào đi) vào đi"
                />
              </GridItem>

              <GridItem w="100%" h="90">
                <InputField
                  label="large Image lưu ý hình cần phải lớn trên 512x512 để trống nếu không dùng"
                  name="largeImageKey"
                  placeholder="dán url hình ảnh (cái hình to) vào đi lưu ý hình cần phải lớn trên 512x512"
                />
                {/* <ShowImage src={values.largeImageKey} /> */}
              </GridItem>
            </Grid>
            <Button type="submit" colorScheme="teal" mt={4}>
              {isTurnOn ? "stop" : "start"}
            </Button>
          </Form>
        )}
      </Formik>
      {/* create by */}
      <p style={{ display: "flex" , margin : "1px"}}>
        được làm bởi{" "}
        <p onClick={onClickToP} style={{ cursor: "pointer", color: "blue" }}>
          ai đó trên mạng
        </p>
      </p>
    </Wrapper>
  );
};
export default Index;
