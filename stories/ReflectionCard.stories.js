/**
 * Stories for the ReflectionCard component.
 *
 * @flow
 */

// $FlowFixMe
import {ContentState} from 'draft-js';
import React from 'react';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';

import ReflectionCard from 'universal/components/ReflectionCard/ReflectionCard';

import RetroBackground from './components/RetroBackground';
import StoryContainer from './components/StoryContainer';

storiesOf('ReflectionCard', module)
  .add('with no contents', () => (
    <StoryContainer
      render={() => (
        <RetroBackground>
          <ReflectionCard
            contentState={ContentState.createFromText('')}
            handleDelete={action('handle-delete')}
            handleSave={action('handle-save')}
          />
        </RetroBackground>
      )}
    />
  ))
  .add('with one line', () => (
    <StoryContainer
      render={() => (
        <RetroBackground>
          <ReflectionCard
            contentState={ContentState.createFromText('One line of text.')}
            handleDelete={action('handle-delete')}
            handleSave={action('handle-save')}
          />
        </RetroBackground>
      )}
    />
  ))
  .add('with many lines', () => (
    <StoryContainer
      render={() => (
        <RetroBackground>
          <ReflectionCard
            contentState={
              ContentState.createFromText(
                'This is a long observation. ' +
                'I have a lot of feelings and want my team to know. ' +
                "There's much to say, and I hope people have the patience to read this because it's, like, super important. " +
                'At some point, this will get really long, and it should probably overflow by scrolling. ' +
                "I hope folks don't get mad at me for writing so much. " +
                'Seriously. When will I stop??'
              )
            }
            handleDelete={action('handle-delete')}
            handleSave={action('handle-save')}
          />
        </RetroBackground>
      )}
    />
  ))
  .add('un-editable', () => (
    <StoryContainer
      render={() => (
        <RetroBackground>
          <ReflectionCard
            contentState={ContentState.createFromText('Delete me!')}
          />
        </RetroBackground>
      )}
    />
  ));
