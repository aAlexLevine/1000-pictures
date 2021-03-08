import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export default function Loading() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <div>
        <Typography>Loading 1000 Pictures...</Typography>
      </div>
    </Box>
  );
}
