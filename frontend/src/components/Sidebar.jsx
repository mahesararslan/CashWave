import {
    Card,
    List,
    ListItem,
    ListItemPrefix,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    InboxIcon,
    UserCircleIcon,
    PowerIcon,
  } from "@heroicons/react/24/solid";
  import { Link,useNavigate } from "react-router-dom";

  
  export function Sidebar() {
    const navigate = useNavigate();

    return (
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <List>
          <ListItem className="mb-5 mt-4">
            <ListItemPrefix className="mr-2" >
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to="/dashboard">Dashboard</Link>
          </ListItem>
          <ListItem className="mb-5">
            <ListItemPrefix className="mr-2" >
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to="/history">History</Link>
          </ListItem>
          <ListItem className="mb-5">
            <ListItemPrefix className="mr-2" >
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to="/profile">Profile</Link>
          </ListItem>
          <ListItem onClick={() => {
                localStorage.removeItem("token");
                navigate("/signin");
            }} className="mb-5">
            <ListItemPrefix className="mr-2" >
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    );
  }
  