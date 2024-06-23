import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from "@novu/notification-center";


export default function NovuBell({subscriberId }: {subscriberId: string}) {
    return (
        <NovuProvider
        subscriberId={'zjdxsbj9'}//"62d1fc97bbe3160014a8cb23"
      applicationIdentifier={"zj4gpmaE8rAK"}
    >
      <PopoverNotificationCenter colorScheme="light">
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
    )
}