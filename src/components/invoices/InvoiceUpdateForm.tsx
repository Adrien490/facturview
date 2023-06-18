import React, { type Key, useEffect, useState } from "react";
import { useFormik } from "formik";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { HiPlus } from "react-icons/hi2";
import Select from "react-select";
import { type Invoice, type Product } from "@prisma/client";

interface InvoiceUpdateFormProps {
  onClose: () => void;
  values: Invoice  | null | undefined,
}

export const InvoiceUpdateForm = ({ onClose, values }: InvoiceUpdateFormProps) => {
  return(<div></div>)
};
