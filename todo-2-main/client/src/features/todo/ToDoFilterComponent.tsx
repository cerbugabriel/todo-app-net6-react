import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { menuItems } from "../../models/TodoModels";

type Props = {
  id: string;
  value: string;
  label: string;
  title: string;
  handleChange: any;
  menuItems: menuItems[];
};

export function TodoFilter(props: Props) {
  return (
    <Grid
      md={4}
      xs={6}
      item
      container
      spacing={2}
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Grid item>
        <Typography>{props.title}</Typography>
      </Grid>
      <Grid item>
        <FormControl margin="normal">
          <InputLabel id={props.id}>{props.label}</InputLabel>
          <Select
            labelId={props.id}
            value={props.value}
            onChange={props.handleChange}
          >
            {props.menuItems.map((item, key) => (
              <MenuItem key={key} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
