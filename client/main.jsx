import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router } from "react-router-dom";
import { Views } from '../imports/ui/Views';
import { App } from '../imports/ui/App';

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  root.render(
    <Router>
      <App/>
    </Router>
  );
});
