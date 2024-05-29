import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/UserServices";
import DataTablePrime from "../../components/DataTable";
import { userColums } from "../../components/utils";

const Users = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state?.users);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div>
      <DataTablePrime data={data} colums={userColums} source={"user"} />
    </div>
  );
};

export default Users;
