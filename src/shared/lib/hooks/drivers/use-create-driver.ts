"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createDriver } from "../../actions/drivers/create-driver";

interface CreateDriverPayload {
  name: string;
  phone: string;
  cityId: string;
  vehicleType: string;
  vehiclePlate: string;
  nationalId: string;
  assignedAreas: string[];
}

export function useCreateDriver() {
  return useMutation({
    mutationFn: (payload: CreateDriverPayload) => createDriver(payload),
  });
}
