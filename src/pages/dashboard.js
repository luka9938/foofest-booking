import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fbqdkjurwhlhzytwwqng.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZicWRranVyd2hsaHp5dHd3cW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwMjY3MjMsImV4cCI6MTk5ODYwMjcyM30.dfxQxZZyAZ1-vFpLrECXTIakwI-UHxBmGtXxAUNtPPQ";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function Dashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const { data: requests, error } = await supabase
      .from("Contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.log("error", error);
    else setRequests(requests);
  };

  const handleDeleteRequest = async (id) => {
    const { error } = await supabase.from("Contacts").delete().match({ id });
    if (error) console.log("error", error);
    else fetchRequests();
  };

  return (
    <div>
      <div className="dash">
        <h1>Contacts</h1>
        <ul>
          {requests.map((request) => (
            <li key={request.id}>
              <p>Date: {new Date(request.created_at).toLocaleDateString()}</p>
              <p>Name: {request.name}</p>
              <p>
                Email: <a href={`mailto:${request.email}`}>{request.email}</a>
              </p>
              <p>
                Phone: <a href={`tel:${request.phone}`}>{request.phone}</a>
              </p>
              <button
                className="button"
                onClick={() => handleDeleteRequest(request.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
