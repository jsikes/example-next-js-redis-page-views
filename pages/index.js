import { useEffect, useState } from 'react';

const Index = () => {
  const [viewCount, setViewCount] = useState(0);

  const handleLogView = async () => {
    const response = await fetch('/api/logView', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ slug: 'example-slug' })
    });

    const json = await response.json();

    return json;
  };

  const handleGetViewCount = async () => {
    const res = await fetch('/api/viewCount', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ slug: 'example-slug' })
    });

    const json = await res.json();

    return json;
  };

  useEffect(() => {
    handleLogView();
  }, []);

  useEffect(() => {
    const asyncUseEffectWrapper = async () => {
      const getViewCount = await handleGetViewCount();

      setViewCount(getViewCount.viewCount);
    };

    asyncUseEffectWrapper();
  }, []);

  return (
    <>
      <h1>Redis Page View Count</h1>
      <p>View count: {viewCount}</p>
    </>
  );
};

export default Index;
