import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import Button, { ButtonProps } from './button'

describe('Test button component', () => {
  it('should render a default button', () => {
    const wrapper = render(<Button>Default</Button>)
    const element = wrapper.getByText('Default') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toBe('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element).toHaveTextContent(/^Default$/)
  })

  it('should render a primary-lg button with props', () => {
    const props: ButtonProps = {
      className: 'custom-class',
      btnType: 'primary',
      size: 'lg'
    }
    const wrapper = render(<Button {...props}>Primary</Button>)
    const element = wrapper.getByText('Primary') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toBe('BUTTON')
    expect(element).toHaveClass('btn btn-primary custom-class btn-lg')
    expect(element).toHaveTextContent(/^Primary$/)
  })

  it('should render a link button', () => {
    const props: ButtonProps = {
      btnType: 'link',
      href: 'mock'
    }
    const wrapper = render(<Button {...props}>Link</Button>)
    const element = wrapper.getByText('Link') as HTMLAnchorElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toBe('A')
    expect(element).toHaveClass('btn btn-link')
    expect(element).toHaveTextContent(/^Link$/)
  })

  it('has been clicked', () => {
    const props: ButtonProps = {
      onClick: jest.fn()
    }
    const wrapper = render(<Button {...props}>Click</Button>)
    const element = wrapper.getByText('Click') as HTMLButtonElement
    fireEvent.click(element)
    expect(props.onClick).toHaveBeenCalledTimes(1)
  })

  it('cannot be clicked when disabled set to true', () => {
    const props: ButtonProps = {
      disabled: true,
      onClick: jest.fn()
    }
    const wrapper = render(<Button {...props}>Disabled</Button>)
    const element = wrapper.getByText('Disabled') as HTMLButtonElement
    fireEvent.click(element)
    expect(props.onClick).not.toHaveBeenCalledTimes(1)
  })
})
