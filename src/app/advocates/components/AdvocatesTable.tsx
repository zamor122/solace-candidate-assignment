//AdvocatesTable
"use client";
import SearchBar from "@/app/general/components/SearchBar";
import Table from "@/app/general/components/Table";
import {useEffect, useState} from "react";

const advocatesTableColumns = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "city", label: "City" },
  { key: "degree", label: "Degree" },
  { key: "specialties", label: "Specialties" },
  { key: "yearsOfExperience", label: "Years of Experience" },
  { key: "phoneNumber", label: "Phone Number" },
];

export default function AdvocatesTable() {
  const [advocates, setAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`api/advocates?st=${searchTerm}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonResponse = await response.json();
        if (jsonResponse.data) {
          setAdvocates(jsonResponse.data);
        } else {
          setAdvocates([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setAdvocates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Table
        data={advocates}
        columns={advocatesTableColumns}
        emptyMessage="No Advocates found for search terms"
        loading={loading}
      />
    </>
  );
}
