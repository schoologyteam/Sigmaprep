// list of all groups in card and a search bar at the top
// use use effect and dispatch to get all groups
// use use selector to get the groups
// map all groups to a groupCard
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Header, Segment, Card, Container, Icon, Label, Divider, Dropdown } from 'semantic-ui-react';

import { selectArrayOfIncludingItems } from 'maddox-js-funcs';
import Searchbar from '@components/Searchbar';
import { selectLoadingState } from '@app/store/loadingSlice';
import GroupCard from '@app/class/group/GroupCard';
import { getAllGroups, GROUP_TYPES, selectGroupsState } from '@app/class/group/groupSlice';
import NoItemsFound from '@components/NoItemsFound';
import { getSchools, selectSchoolState } from '@app/class/school/schoolSlice';

/**
 * Global list of all study groups (flash-card sets).
 * Similar UI/UX to Quizlet's search page.
 */
export default function List() {
  const dispatch = useDispatch();

  // Fetch every group once on mount
  useEffect(() => {
    dispatch(getAllGroups());
    dispatch(getSchools()); // load schools for filter dropdown
  }, [dispatch]);

  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setStateFilter] = useState(searchParams.get('filter') || '');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || '');
  const [schoolFilter, setSchoolFilter] = useState(searchParams.get('school') || '');

  const loading = useSelector(selectLoadingState).loadingComps.List;
  /** @type {import('../../../../../types').Group[]} */
  const allGroups = useSelector(selectGroupsState);

  const schools = useSelector(selectSchoolState) || [];

  // options for dropdown
  const schoolOptions = useMemo(() => {
    const opts = schools.map((s) => ({ key: s.id, value: s.school_name, text: s.school_name }));
    return [{ key: 'all', value: '', text: 'All Schools' }, ...opts];
  }, [schools]);

  const groups = selectArrayOfIncludingItems(
    allGroups,
    ['name', 'type', 'school_name'],
    [filter || '', typeFilter, schoolFilter],
  );

  function setFilter(newStr) {
    if (newStr && newStr !== '') {
      searchParams.set('filter', newStr);
    } else {
      searchParams.delete('filter');
    }
    setSearchParams(searchParams);
    setStateFilter(newStr);
  }

  function handleTypeClick(type) {
    if (typeFilter === type) {
      // If clicking the active filter, clear it
      searchParams.delete('type');
      setSearchParams(searchParams);
      setTypeFilter('');
    } else {
      // Set new filter
      searchParams.set('type', type);
      setSearchParams(searchParams);
      setTypeFilter(type);
    }
  }

  function handleSchoolChange(value) {
    if (value === '' || !value) {
      searchParams.delete('school');
      setSearchParams(searchParams);
      setSchoolFilter('');
    } else {
      searchParams.set('school', value);
      setSearchParams(searchParams);
      setSchoolFilter(value);
    }
  }

  // Clear type filter if it yields no results
  useEffect(() => {
    if (!loading && groups?.length === 0 && typeFilter) {
      handleTypeClick('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <Container data-testid='sets-list-page'>
      <Segment basic loading={loading}>
        <Header as='h2' color='blue' dividing>
          <Icon name='search' />
          <Header.Content>
            Explore Study Sets <Header.Subheader>Search or filter to find what you need</Header.Subheader>
          </Header.Content>
        </Header>

        {/* Search & filter row */}
        <div style={{ marginBottom: '1rem' }}>
          <Searchbar setValue={setFilter} value={filter} placeholder={'Search study sets'} />
          <Label
            key={'All'}
            as='a'
            color={typeFilter === '' ? 'blue' : 'grey'}
            onClick={() => handleTypeClick('')}
            style={{
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              opacity: typeFilter && typeFilter !== '' ? 0.6 : 1,
            }}
          >
            All
            {typeFilter === '' && <Icon name='close' style={{ marginLeft: '4px' }} />}
          </Label>
          {GROUP_TYPES.map((type) => (
            <Label
              key={type}
              as='a'
              color={typeFilter === type ? 'blue' : 'grey'}
              onClick={() => handleTypeClick(type)}
              style={{
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                opacity: typeFilter && typeFilter !== type ? 0.6 : 1,
              }}
            >
              {type}
              {typeFilter === type && <Icon name='close' style={{ marginLeft: '4px' }} />}
            </Label>
          ))}
          <Dropdown
            placeholder='Filter by school'
            selection
            clearable
            options={schoolOptions}
            value={schoolFilter}
            onChange={(e, { value }) => handleSchoolChange(value)}
            style={{ marginLeft: '1rem', minWidth: '200px' }}
          />
        </div>

        {groups?.length === 0 && <NoItemsFound message={'Try adjusting your filters or search term'} />}

        <Card.Group itemsPerRow={4} stackable>
          {groups?.map((group) => (
            <GroupCard
              key={group.id}
              id={group.id}
              name={group.name}
              description={group.desc}
              class_id={group.class_id}
              created_by={group.created_by}
              type={group.type}
              school_id={group.school_id}
              school_name={group.school_name}
            />
          ))}
        </Card.Group>

        {/* Nice bottom divider for spacing */}
        <Divider style={{ marginTop: '5rem' }} hidden />
      </Segment>
    </Container>
  );
}
