import React from "react";
import { Text } from "../components/Text";

export const DummyEventPage: React.FC = () => {
  return (
    <div className="p-4">
      <Text className="font-bold text-xl">Dummy Event Page</Text>
      <Text>
        This is a placeholder page for events. You navigated here from the Main
        Calendar!
      </Text>
    </div>
  );
};
