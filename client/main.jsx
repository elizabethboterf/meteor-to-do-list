import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { App } from '/imports/ui/App';
import { BrowserRouter as Router, RouterProvider } from "react-router-dom";
import { Views } from '../imports/ui/Views';

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  root.render(
    <Router>
      <Views/>
    </Router>
  );
});
