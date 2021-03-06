import Vue from 'vue';
import { Mark } from '@marvr/storyblok-rich-text-types';
import {
  SbBold,
  SbStrong,
  SbStrike,
  SbUnderline,
  SbItalic,
  SbCode,
  SbLink,
  SbStyled,
} from '../components/marks';

export type MarkResolvers = {
  [key in Mark]: typeof Vue;
};

export const defaultMarkResolvers: MarkResolvers = {
  [Mark.BOLD]: SbBold,
  [Mark.STRONG]: SbStrong,
  [Mark.STRIKE]: SbStrike,
  [Mark.UNDERLINE]: SbUnderline,
  [Mark.ITALIC]: SbItalic,
  [Mark.CODE]: SbCode,
  [Mark.LINK]: SbLink,
  [Mark.STYLED]: SbStyled,
};
