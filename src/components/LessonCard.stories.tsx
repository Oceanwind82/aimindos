import React from 'react';
import { LessonCard } from './LessonCard';

export default {
  title: 'Components/LessonCard',
  component: LessonCard,
};

export const Default = () => (
  <LessonCard title="Sample Lesson" description="This is a sample lesson." />
);
