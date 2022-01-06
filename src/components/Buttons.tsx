import { Stack, Button, Box, TextField } from "@mui/material";
import useConnectWallet from "../hooks/useConnectWallet";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  video: string;
}

interface Props {
  wave: (video: string) => void;
}

const Buttons = ({ wave }: Props) => {
  const { connectWalletHandler, currentAccount } = useConnectWallet();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit: SubmitHandler<Inputs> = async ({ video }) => {
    await wave(video);
    reset();
  };

  return (
    <>
      {currentAccount ? (
        <>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              {...register("video", {
                required: "Fill this field please",
                pattern: {
                  value: /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/,
                  message: "Please paste a valid YouTube Video URL",
                },
              })}
              disabled={isSubmitting}
              fullWidth
              variant="filled"
              id="video"
              name="video"
              label={errors.video ? errors.video.message : "Paste a YouTube Video URL here!"}
              error={errors.video}
            />
            <Button type="submit" fullWidth variant="contained" disabled={isSubmitting} sx={{ mt: 3, mb: 2 }}>
              Send Wave
            </Button>
          </Box>
        </>
      ) : (
        <Stack sx={{ pt: 2 }} direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" size="large" onClick={connectWalletHandler}>
            Connect to wallet
          </Button>
        </Stack>
      )}
    </>
  );
};

export default Buttons;
