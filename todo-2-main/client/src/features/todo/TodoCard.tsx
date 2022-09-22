import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Todo } from "../../models/TodoModels";

type Props = {
  todo: Todo;
  onClick: any;
};

export function TodoCard(props: Props) {
  return (
    <Card>
      <CardContent>
        <Typography color="textPrimary" gutterBottom>
          {props.todo.title}
        </Typography>
        <Typography variant="body2" color="textPrimary" gutterBottom>
          {props.todo.content}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {new Date(props.todo.creationTime).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.todo.status}
        </Typography>
        {props.todo.status === "Active" ? (
          <Button
            variant="contained"
            onClick={(_) => props.onClick(props.todo.id)}
          >
            Mark as Done
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}
