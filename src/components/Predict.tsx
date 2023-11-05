import React, { useState } from "react";
import {
  Grid,
  TextInput,
  Select,
  Flex,
  Button,
  Group,
  Alert,
  Space,
} from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import myGif from "../assets/heart-disease.gif";
import SkeletonLoading from "./SkeletonLoading";

interface formProps {
  age: string;
  sex: string;
  cp: string;
  trtbps: string;
  chol: string;
  fbs: string;
  restecg: string;
  thalachh: string;
  exng: string;
  oldpeak: string;
  slp: string;
  caa: string;
  thall: string;
}

function Predict() {
  const [isDisease, setIsDisease] = useState({
    loading: false,
    view: false,
    status: "",
  });

  const form = useForm({
    initialValues: {
      age: "",
      sex: "",
      cp: "",
      trtbps: "",
      chol: "",
      fbs: "",
      restecg: "",
      thalachh: "",
      exng: "",
      oldpeak: "",
      slp: "",
      caa: "",
      thall: "",
    },

    validate: {
      age: isNotEmpty("This field is required."),
      sex: isNotEmpty("This field is required."),
      cp: isNotEmpty("This field is required."),
      trtbps: isNotEmpty("This field is required."),
      chol: isNotEmpty("This field is required."),
      fbs: isNotEmpty("This field is required."),
      restecg: isNotEmpty("This field is required."),
      thalachh: isNotEmpty("This field is required."),
      exng: isNotEmpty("This field is required."),
      oldpeak: isNotEmpty("This field is required."),
      slp: isNotEmpty("This field is required."),
      caa: isNotEmpty("This field is required."),
      thall: isNotEmpty("This field is required."),
    },
  });

  function getRandomNumber(min: number, max: number) {
    return String(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  const setFormRandom = () => {
    form.setFieldValue("age", getRandomNumber(10, 100));
    form.setFieldValue("sex", getRandomNumber(0, 1));
    form.setFieldValue("cp", getRandomNumber(0, 3));
    form.setFieldValue("trtbps", getRandomNumber(94, 200));
    form.setFieldValue("chol", getRandomNumber(126, 564));
    form.setFieldValue("fbs", getRandomNumber(0, 1));
    form.setFieldValue("restecg", getRandomNumber(0, 2));
    form.setFieldValue("thalachh", getRandomNumber(71, 202));
    form.setFieldValue("exng", getRandomNumber(0, 1));
    form.setFieldValue("oldpeak", getRandomNumber(0, 6));
    form.setFieldValue("slp", getRandomNumber(0, 2));
    form.setFieldValue("caa", getRandomNumber(0, 4));
    form.setFieldValue("thall", getRandomNumber(0, 3));
  };

  const callPrediction: any = async (data: Record<string, number>) => {
    const response = await fetch(
      "https://heart-attack-prediction-dtpr.onrender.com/predict",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      return response.json();
    }
    return "";
  };

  async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const predict = async (values: { [key: string]: string }) => {
    // reset
    setIsDisease({
      status: "",
      view: false,
      loading: true,
    });

    const reg = /^-?\d+(\.\d+)?$/;
    let allcheck = true;

    const textData = ["age", "trtbps", "chol", "thalachh", "oldpeak"];

    for (const field of textData) {
      if (!reg.test(values[field])) {
        form.setFieldError(field, "Only numbers are allowed");
        allcheck = false;
      }
    }

    const customer: Record<string, number> = {};

    if (allcheck) {
      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          customer[key] = parseInt(values[key], 10);
        }
      }

      await delay(800);

      const result = await callPrediction(customer);

      setIsDisease({
        loading: false,
        view: true,
        status: result?.data,
      });
    } else {
      return;
    }
  };

  function getAlertTitle() {
    if (isDisease.status === "no_disease") {
      return "You're in great shape! Keep up the good work, and stay heart-healthy!";
    }
    return "Sorry, your heart deserves some extra care, and we're here to help.";
  }

  return (
    <div
      style={{
        marginBottom: 30,
      }}
    >
      <Group justify="right" my="xl">
        <Button variant="outline" onClick={() => setFormRandom()}>
          Set random values
        </Button>
      </Group>
      <form
        onSubmit={form.onSubmit((values) => predict(values))}
        style={{
          marginBottom: 30,
        }}
      >
        <Flex direction="column" gap="lg">
          <Grid>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <TextInput
                label="Age"
                placeholder="20"
                {...form.getInputProps("age")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Select
                label="Sex"
                placeholder="Pick value"
                data={[
                  {
                    label: "Male",
                    value: "1",
                  },
                  {
                    label: "Female",
                    value: "0",
                  },
                ]}
                {...form.getInputProps("sex")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Select
                label="Chest Pain Type "
                placeholder="Pick value"
                data={[
                  {
                    label: "Typical Angina",
                    value: "0",
                  },
                  {
                    label: "Aypical Angina",
                    value: "1",
                  },
                  {
                    label: "Non-Anginal Pain",
                    value: "2",
                  },
                  {
                    label: "Asymptomatic",
                    value: "3",
                  },
                ]}
                {...form.getInputProps("cp")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <TextInput
                label="Resting Blood Pressure (in mm Hg)"
                placeholder="100"
                {...form.getInputProps("trtbps")}
              />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <TextInput
                label="Cholestoral in mg/dl fetched via BMI sensor"
                placeholder="100"
                {...form.getInputProps("chol")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Select
                label="Fasting blood sugar > 120 mg/dl"
                placeholder="Pick value"
                data={[
                  {
                    label: "Yes",
                    value: "1",
                  },
                  {
                    label: "No",
                    value: "0",
                  },
                ]}
                {...form.getInputProps("fbs")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Select
                label="Resting Electrocardiographic Results"
                placeholder="Pick value"
                data={[
                  {
                    label: "Normal",
                    value: "0",
                  },
                  {
                    label: "Having ST-T wave abnormality",
                    value: "1",
                  },
                  {
                    label: "Showing probable ",
                    value: "2",
                  },
                ]}
                {...form.getInputProps("restecg")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <TextInput
                label="Maximum Heart Rate Achieved"
                placeholder="110"
                {...form.getInputProps("thalachh")}
              />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Select
                label="Exercise induced angina"
                placeholder="Pick value"
                data={[
                  {
                    label: "Yes",
                    value: "1",
                  },
                  {
                    label: "No",
                    value: "0",
                  },
                ]}
                {...form.getInputProps("exng")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Select
                label="The Peak Exercise ST Segment (slp)"
                placeholder="Pick value"
                data={[
                  {
                    label: "Downsloping",
                    value: "0",
                  },
                  {
                    label: "Flat",
                    value: "1",
                  },
                  {
                    label: "Upsloping",
                    value: "2",
                  },
                ]}
                {...form.getInputProps("slp")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Select
                label="Number of Major Vessels Colored"
                placeholder="Pick value"
                data={[
                  {
                    label: "0",
                    value: "0",
                  },
                  {
                    label: "1",
                    value: "1",
                  },
                  {
                    label: "2",
                    value: "2",
                  },
                  {
                    label: "3",
                    value: "3",
                  },
                  {
                    label: "4",
                    value: "4",
                  },
                ]}
                {...form.getInputProps("caa")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <Select
                label="Thallium Stress Test (thall)"
                placeholder="Pick value"
                data={[
                  {
                    label: "Null",
                    value: "0",
                  },
                  {
                    label: "Fixed defect",
                    value: "1",
                  },
                  {
                    label: "Normal",
                    value: "2",
                  },
                  {
                    label: "Reversible defect",
                    value: "3",
                  },
                ]}
                {...form.getInputProps("thall")}
              />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
              <TextInput
                label="ST Depression Induced (oldpeak)"
                placeholder="0.2"
                {...form.getInputProps("oldpeak")}
              />
            </Grid.Col>
          </Grid>
        </Flex>
        <Flex align="end" justify="end" mt="lg">
          <Button
            w="200"
            type="submit"
            variant="filled"
            loading={isDisease.loading}
          >
            Predict
          </Button>
        </Flex>
      </form>
      <Space h="md" />
      {isDisease.loading && <SkeletonLoading />}
      {isDisease.view && (
        <Group justify="center" mt="30">
          <Alert
            variant="light"
            color={isDisease.status === "no_disease" ? "green" : "red"}
            title={getAlertTitle()}
          >
            Heart health is about nurturing your body's lifeline. It's the
            cornerstone of a vibrant, energetic life. When you take care of your
            heart, you're embracing wellness, vitality, and happiness. It's a
            journey filled with good choices, mindfulness, and support - all
            leading to a strong, resilient heart. Keep your heart in top shape,
            and it will reward you with years of joy and well-being.
          </Alert>
          <img
            src={myGif}
            alt="heart-disease"
            loading="lazy"
            width="100%"
            height={600}
            className="gif-con"
            style={{
              objectFit: "fill",
              borderRadius: 10,
              marginBottom: 50,
            }}
          />
        </Group>
      )}
    </div>
  );
}

export default Predict;
