import { useEffect, useState } from "react";
import "./App.css";
import { IActivity } from "./Domain/Activity";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";

function App() {
  const [data, setData] = useState<IActivity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<IActivity[]>(
        "http://localhost:5106/api/activities"
      );
      const result = response.data;
      console.log(result);
      setData(result);
    };
    fetchData();
  }, []);
  return (
    <>
      <Typography variant="h3">React</Typography>
      <List>
        {data.map((obj: IActivity) => {
          return (
            <ListItem key={obj.id}>
              <ListItemText>{obj.title}</ListItemText>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

export default App;
