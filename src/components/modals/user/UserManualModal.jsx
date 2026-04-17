"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@heroui/react";
import { MdClose } from "react-icons/md";

const UserManualModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      hideCloseButton={true}
      isDismissable={true}
      size="full"
      className="z-50"
      classNames={{
        base: "h-[95vh] w-[95vw] max-w-none mx-auto my-auto",
      }}
    >
      <ModalContent>
        <>
          {/* HEADER */}
          <ModalHeader className="flex justify-between items-center bg-primary text-white p-3">
            <div className="pl-4 font-semibold text-lg">
                Manual
            </div>

            <Button
              color="transparent"
              variant="light"
              onClick={onClose}
            >
              <MdClose size={28} />
            </Button>
          </ModalHeader>

          {/* BODY */}
          <ModalBody className="p-0 h-full">
            <iframe
              src="/manuals/user-manual.pdf"
              className="w-full h-full"
            />
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
};

export default UserManualModal;