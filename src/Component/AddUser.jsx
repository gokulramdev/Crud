import { useState } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useHistory, withRouter } from "react-router-dom";
import Api from "../Service/Api";
import { toast } from 'react-toastify';


const initialValue = {
  name: "",
  username: "",
  email: "",
  phone: "",
};

const useStyles = makeStyles({
  container: {
    width: "50%",
    margin: "5% 0 0 25%",
    "& > *": {
      marginTop: 20,
    },
  },
});

const AddUser = (props) => {
  const [user, setUser] = useState(initialValue);
  const { username, email, phone } = user;
  const classes = useStyles();
  let history = useHistory();

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUserDetails = async () => {
    await Api.post(`users`, user).then((res) => {
      if (res.status === 201) {
        history.push("/");
        toast.success("User Created Successfully")
      }
    });
  };

  return (
    <>
      <FormGroup className={classes.container}>
        <Typography variant="h4">Add User Details</Typography>
        <FormControl>
          <InputLabel htmlFor="my-input">Name</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="name"
            value={user.name}
            id="my-input"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Username</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="username"
            value={username}
            id="my-input"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Email</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="email"
            value={email}
            id="my-input"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Phone</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="phone"
            value={phone}
            id="my-input"
          />
        </FormControl>
        <FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={() => addUserDetails()}
          >
            Submit
          </Button>
        </FormControl>
      </FormGroup>
    </>
  );
};

export default withRouter(AddUser);
