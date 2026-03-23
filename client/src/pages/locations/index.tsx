import { List } from "@refinedev/antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { LocationContainer } from "./components/locationContainer";
import "./locations.css";

dayjs.extend(utc);

export const Locations = () => {
  return (
    <List>
      <DndProvider backend={HTML5Backend}>
        <LocationContainer />
      </DndProvider>
    </List>
  );
};

export default Locations;
