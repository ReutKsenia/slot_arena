<script lang="ts">
const TAG_NAME_COMPONENT = 'svg';
const TAG_NAME_INNER = 'use';

const SvgIcon = (props: { name: string }, context: any) => {
  return h(
    TAG_NAME_COMPONENT,
    {
      ...context.attrs,
      width: 24,
      height: 24,
      class: 'icon',
      'aria-hidden': 'true',
    },
    [
      h(TAG_NAME_INNER, {
        href: `#${props.name}`,
      }),
    ],
  );
};

SvgIcon.props = ['name'];

export default SvgIcon;
</script>

<style lang="scss" src="./SvgIcon.scss"></style>
