"use client";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { Chip } from "@nextui-org/chip";
import { Link } from "@nextui-org/link";

export default function Hero() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <section className="relative mx-auto flex max-w-screen-xl flex-col items-center justify-center gap-12 px-4 py-28 md:px-8">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="mx-auto flex max-w-4xl flex-col items-center justify-center space-y-5 text-center"
      >
        <Chip
          className="border-1 border-secondary/20"
          classNames={{
            content:
              "font-semibold text-primary-500 dark:text-primary-600 text-xs space-x-2 rtl:space-x-reverse",
          }}
          variant="flat"
        >
          <span>We Are Here</span>
          <span aria-label="emoji" role="img">
            🔥
          </span>
        </Chip>
        <h1 className="mx-auto text-pretty text-4xl font-medium tracking-tighter md:text-6xl">
          Welcome to the Future Developers Club!
        </h1>
        <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground">
          Discover and develop your skills in programming and modern
          technologies with the Future Developers Club.
        </p>
        <Button
          onPress={onOpen}
          color="primary"
          variant="shadow"
          className="bg-primary-2 shadow-primary-2/50"
        >
          Learn More About the Club
        </Button>
        <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
          <ModalContent>
            <ModalHeader>Future Developers Club Team</ModalHeader>
            <ModalBody>
              If you&apos;re reading this, we would love to hear your
              suggestions about the website or the club in general.
            </ModalBody>
            <ModalFooter>
              <Button
                as={Link}
                href="https://t.me/+e2kKkyiEqCw4ZTlk"
                color="primary"
                variant="solid"
                size="sm"
              >
                Contact Us on Telegram{" "}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </motion.div>
    </section>
  );
}
