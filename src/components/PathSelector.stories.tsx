import React from 'react';
import { PathSelector } from './PathSelector';

export default {
  title: 'Components/PathSelector',
  component: PathSelector,
};

export const Default = () => <PathSelector paths={['Math', 'Science']} />;
