import { createSelectors, usePersonStore } from '@/store';

const Network = () => {
  const persionStore = createSelectors(usePersonStore);
  const updateFirstName = persionStore.use.updateFirstName();
  const firstName = persionStore.use.firstName();
  return (
    <>
      <div>
        <label>
          First name
          <input
            // Update the "firstName" state
            onChange={(e) => updateFirstName(e.currentTarget.value)}
            value={firstName}
          />
        </label>

        <p>
          Hello, <strong>{firstName}!</strong>
        </p>
      </div>
    </>
  );
};

export default Network;
